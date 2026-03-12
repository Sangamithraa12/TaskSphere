using TaskSphere.API.Data;
using TaskSphere.API.DTOs;
using TaskSphere.API.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace TaskSphere.API.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;
        public AuthService(ApplicationDbContext context) { _context = context; }

        public async Task<User> Register(UserRegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Username == dto.Username)) return null;

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> Login(UserLoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null) return null;
            return BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash) ? user : null;
        }
    }
}