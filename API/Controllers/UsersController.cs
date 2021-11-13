using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly ApplicationDbContext _dbContext;
        public UsersController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetUsersResponseDto>>> GetUsers()
        {
            var result = await _dbContext.AppUsers.Select(x => new GetUsersResponseDto{
                Id = x.Id,
                UserName = x.UserName
            }).ToListAsync();

            return result;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<GetUserDetailResponseDto>> GetUserById(int id)
        {
            var user = await _dbContext.AppUsers.FirstOrDefaultAsync(x => x.Id == id);

            if(user == null) return new GetUserDetailResponseDto{};

            var result = new GetUserDetailResponseDto{
                Id = user.Id,
                UserName = user.UserName
            };
            
            return result;
        }
    }
}