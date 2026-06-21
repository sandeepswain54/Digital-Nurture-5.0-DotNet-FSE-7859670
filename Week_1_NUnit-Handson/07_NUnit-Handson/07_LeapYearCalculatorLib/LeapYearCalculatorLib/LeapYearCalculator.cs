namespace LeapYearCalculatorLib
{
    public class LeapYearCalculator
    {
        public int IsLeapYear(int year)
        {
            if (year < 1753 || year > 9999)
            {
                return -1;
            }

            if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
            {
                return 1;
            }

            return 0;
        }
    }
}
