using System;

namespace UserManagerLib
{
    public class UserManager
    {
        public string CreateUser(string panCardNo)
        {
            if (panCardNo == null)
            {
                throw new NullReferenceException("PAN card number cannot be null");
            }

            if (panCardNo.Length != 10)
            {
                throw new FormatException("PAN card number must be exactly 10 characters long");
            }

            return $"User created successfully with PAN {panCardNo}";
        }
    }
}
