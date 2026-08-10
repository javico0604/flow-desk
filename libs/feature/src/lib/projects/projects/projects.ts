import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Project, ProjectService } from '@flow-desk/data-access';
import { provideTranslocoScope, TranslocoPipe } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'lib-projects',
  imports: [
    TranslocoPipe,
    NzFlexModule,
    NzButtonModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  providers: [
    provideTranslocoScope({
      scope: 'projects',
      alias: 'projects',
    }),
  ],
})
export class ProjectsComponent implements OnInit {

  public projectList = signal<Project[]>([]);

  private projectService = inject(ProjectService);
  private router = inject(Router)

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((project) => {
      this.projectList.set(project)
    })
  }

  navigateToProject(id: number) {
    this.router.navigate(['/project', id])
  }
}
