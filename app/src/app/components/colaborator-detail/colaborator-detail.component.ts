import { Component, OnInit, Input } from '@angular/core';
import { Colaborator } from '../../models/colaborator';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ColaboratorService } from '../../services/colaborator-service/colaborator.service';
import { Role } from 'src/app/models/role';
import { Status } from 'src/app/models/status';
import { RoleService } from 'src/app/services/role-service/role.service';
import { StatusService } from 'src/app/services/status-service/status.service';

@Component({
  selector: 'app-colaborator-detail',
  templateUrl: './colaborator-detail.component.html',
  styleUrls: ['./colaborator-detail.component.css']
})
export class ColaboratorDetailComponent implements OnInit {

  @Input() colaborator?: Colaborator;
  roles: Role[] = [];
  statuses: Status[] = [];
  changing: boolean = false;

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  getStatuses(): void {
    this.statusService.getStatuses()
      .subscribe(statuses => this.statuses = statuses);
  }

  getColaborator(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.colaboratorService.getColaborator(id)
      .subscribe(colaborator => this.colaborator = colaborator);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.colaborator) {
      this.colaborator.updatedAt = new Date().toLocaleString();
      this.colaboratorService.updateColaborator(this.colaborator)
        .subscribe(() => { this.changing = false });
    }
  }

  delete(): void {
    if (this.colaborator) {
      this.colaborator.deleted = true;
      this.colaborator.updatedAt = new Date().toLocaleString();
      this.colaboratorService.updateColaborator(this.colaborator)
        .subscribe(() => this.router.navigate(['colaborators']));
    }
  }

  constructor(
    private roleService: RoleService,
    private statusService: StatusService,
    private route: ActivatedRoute,
    private colaboratorService: ColaboratorService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getColaborator();
    this.getRoles();
    this.getStatuses();
  }

}
