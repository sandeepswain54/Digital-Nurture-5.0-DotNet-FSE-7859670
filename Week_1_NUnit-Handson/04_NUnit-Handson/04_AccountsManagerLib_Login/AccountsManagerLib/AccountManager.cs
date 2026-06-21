using System;
using System.Collections.Generic;

namespace AccountsManagerLib
{
    public class AccountManager
    {
        private readonly Dictionary<string, string> _validCredentials = new Dictionary<string, string>
        {
            { "user_11", "secret@user11" },
            { "user_22", "secret@user22" }
        };

        public string Login(string userId, string password)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(password))
            {
                throw new ArgumentException("User id and password are required");
            }

            if (_validCredentials.ContainsKey(userId) && _validCredentials[userId] == password)
            {
                return $"Welcome {userId}!!!";
            }

            return "Invalid user id/password";
        }
    }
}
