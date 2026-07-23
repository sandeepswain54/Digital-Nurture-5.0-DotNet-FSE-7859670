import Trainer from './Trainer';

const trainersMock = [
  new Trainer(1, 'Alice Johnson', 'alice@cognizant.com', '9876543210', 'React', ['JavaScript', 'React', 'Redux']),
  new Trainer(2, 'Bob Smith', 'bob@cognizant.com', '9876543211', '.NET', ['C#', 'ASP.NET Core', 'Entity Framework']),
  new Trainer(3, 'Carol White', 'carol@cognizant.com', '9876543212', 'Angular', ['TypeScript', 'Angular', 'RxJS']),
  new Trainer(4, 'David Brown', 'david@cognizant.com', '9876543213', 'Java', ['Spring Boot', 'Hibernate', 'Java']),
  new Trainer(5, 'Eva Green', 'eva@cognizant.com', '9876543214', 'Database', ['SQL Server', 'MongoDB', 'PostgreSQL'])
];

export default trainersMock;
