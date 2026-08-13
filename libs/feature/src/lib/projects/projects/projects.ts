import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@flow-desk/core';
import { Project, ProjectService } from '@flow-desk/data-access';
import { TranslocoPipe } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { I18N_PROJECTS } from '../i18n/i18n-projects';
import { take } from 'rxjs';

@Component({
  selector: 'lib-projects',
  imports: [
    TranslocoPipe,
    NzFlexModule,
    NzButtonModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent implements OnInit {

  public projectList = signal<Project[]>([]);

  private projectService = inject(ProjectService);
  private router = inject(Router);
  
  private translateService = inject(TranslateService);

  constructor() {
    this.translateService.setTranslation(
      'projects',
      I18N_PROJECTS
    )
  }

  ngOnInit(): void {
    this.projectService.getProjects().pipe(take(1)).subscribe((project) => {
      this.projectList.set(project)
    })
  }

  navigateToProject(id: number) {
    this.router.navigate(['/projects', id]);
  }
}
