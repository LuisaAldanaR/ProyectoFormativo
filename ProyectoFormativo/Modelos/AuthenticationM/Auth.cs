﻿using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProyectoFormativo.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ProyectoFormativo.Modelos.AuthenticationM
{
    public class Auth
    {
        private readonly ProyectoPruebaContext _context;
        public readonly IConfiguration _configuration;

        public Auth(ProyectoPruebaContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // Create a JSon Web Token
        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };


            // We add claims with the Role
            if (user.Role == "Admin")
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            else
                claims.Add(new Claim(ClaimTypes.Role, "Regular"));

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1), 
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computeHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computeHash.SequenceEqual(passwordHash);
            }
        }
    }
}