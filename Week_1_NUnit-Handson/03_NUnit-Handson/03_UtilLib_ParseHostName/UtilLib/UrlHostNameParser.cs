using System;

namespace UtilLib
{
    public class UrlHostNameParser
    {
        public string ParseHostName(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
            {
                throw new ArgumentException("URL cannot be null or empty");
            }

            string withoutProtocol;

            if (url.Contains("://"))
            {
                withoutProtocol = url.Substring(url.IndexOf("://") + 3);
            }
            else
            {
                withoutProtocol = url;
            }

            int slashIndex = withoutProtocol.IndexOf('/');
            string hostPart = slashIndex >= 0 ? withoutProtocol.Substring(0, slashIndex) : withoutProtocol;

            return hostPart;
        }
    }
}
