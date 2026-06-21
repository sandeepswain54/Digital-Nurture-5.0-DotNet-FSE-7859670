using System;

namespace FourSeasonsLib
{
    public class SeasonFinder
    {
        public string GetSeason(string month)
        {
            switch (month.ToLower())
            {
                case "february":
                case "march":
                    return "Spring";
                case "april":
                case "may":
                case "june":
                    return "Summer";
                case "july":
                case "august":
                case "september":
                    return "Monsoon";
                case "october":
                case "november":
                    return "Autumn";
                case "december":
                case "january":
                    return "Winter";
                default:
                    throw new ArgumentException("Invalid month");
            }
        }
    }
}
