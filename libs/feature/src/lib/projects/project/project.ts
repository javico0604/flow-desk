import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectService } from '@flow-desk/data-access';
import { take } from 'rxjs';

@Component({
  selector: 'lib-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class ProjectComponent implements OnInit {
  public project = signal<Project| null>(null);
  
  private projectId = signal<string| null>(null);

  private readonly projectService = inject(ProjectService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.projectId.set(this.route.snapshot.paramMap.get('projectId'));
    if (this.projectId()) {
      this.getProject();
    }
  }

  private getProject() {
    this.projectService.getProjectById(Number(this.projectId())).pipe(take(1)).subscribe((project) => {
      this.project.set(project);
    })
  }
}
