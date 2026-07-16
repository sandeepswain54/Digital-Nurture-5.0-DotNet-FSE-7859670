// Course interface - gives compile-time type checking
// Always prefer interface over 'any' type
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
  enrolled: boolean;
}
