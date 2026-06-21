namespace CollectionsLib
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public System.DateTime JoinDate { get; set; }

        public override bool Equals(object obj)
        {
            if (obj is Employee other)
            {
                return Id == other.Id;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}
