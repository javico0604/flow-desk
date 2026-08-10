import { inject, Injectable } from '@angular/core';
import { ProjectsApiService } from '../../api-client/services';
import { Project } from '../../models/project';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly projectsApiService = inject(ProjectsApiService);

  public getProjects() {
    return this.projectsApiService.projectsControllerFindAll().pipe(
        map((projects) => projects.map((project) => new Project(project))),
    );
  }

  public getProjectById(id: number) {
    return this.projectsApiService.projectsControllerFindOne({ id }).pipe(
      map((project) => new Project(project))
    );
  }

  public createProject(name: string, description: string) {
    return this.projectsApiService.projectsControllerCreate({ body: { name, description } });
  }
}
