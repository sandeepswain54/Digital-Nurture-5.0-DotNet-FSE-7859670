import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetail implements OnInit {

  course: Course | undefined;
  courseId: number = 0;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseId = Number(id);

    // HTTP call to get course by ID
    this.courseService
      .getCourseById(this.courseId)
      .subscribe({
        next: course => {
          this.course = course;
          this.isLoading = false;
        },
        error: err => {
          this.errorMessage = err.message;
          this.isLoading = false;
        }
      });
  }

  goBack() {
    this.router.navigate(['/courses']);
  }
}
