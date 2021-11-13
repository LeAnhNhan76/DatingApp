using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ITokenService _tokenService;
        public AccountController(ApplicationDbContext dbContext, ITokenService tokenService)
        {
            this._dbContext = dbContext;
            this._tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterResponseDto>> Register(RegisterRequestDto registerDto)
        {
            if(await IsUserExists(registerDto.UserName))
            {
                return BadRequest("UserName is taken");
            }

            using var hmac = new HMACSHA512();

            var newUser = new AppUser()
            {
                UserName = registerDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            await _dbContext.AppUsers.AddAsync(newUser);
 
            await _dbContext.SaveChangesAsync();
            
            var result = new RegisterResponseDto {
                UserName = newUser.UserName,
                Token = _tokenService.CreateToken(newUser)
            };

            return result;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto loginDto)
        {
            var user = await _dbContext.AppUsers.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);

            if(user == null) 
            {
                return Unauthorized("Invalid UserName");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(var i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid Password");
                }
            }
            
            var result = new LoginResponseDto {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };

            return result;
        }

        private async Task<bool> IsUserExists(string userName)
        {
            var userNameToLower = userName.ToLower();
            return await _dbContext.AppUsers.AnyAsync(x => x.UserName == userNameToLower);
        }
    }
}