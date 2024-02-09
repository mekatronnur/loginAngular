using System.Security.Cryptography;


namespace AngularAuthAPI.Helpers
{
    public class PasswordHasher
    {
        private static RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
        private static int SaltSize=16;
        private static int HashSize  =20;
        private static int Iterations = 10000;

        public static string HashPassword(string password)
        {
            byte[] salt;
            rng.GetBytes(salt=new byte[SaltSize]);
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            var hash = key.GetBytes(HashSize);
            var hasBytes=new byte[SaltSize+HashSize];
            Array.Copy(salt,0,hasBytes,0,SaltSize);
            Array.Copy(hash,0,hasBytes,SaltSize,HashSize);
            var base64Hash=Convert.ToBase64String(hasBytes);
            return base64Hash;
        }
        public static bool VerifyPassword(string password,string base64Hash)
        {
            var hasBytes=Convert.FromBase64String(base64Hash);
            var salt=new byte[SaltSize];
            Array.Copy(hasBytes,0,salt,0,SaltSize);
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash=key.GetBytes(HashSize);
            for (int i = 0; i < HashSize; i++)
            {
                if (hasBytes[i + SaltSize] != hash[i])
                {
                    return false;
                }
            }
            return true;

        }
    }
}
