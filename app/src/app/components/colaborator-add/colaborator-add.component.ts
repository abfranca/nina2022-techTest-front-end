import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { Status } from 'src/app/models/status';
import { RoleService } from 'src/app/services/role-service/role.service';
import { StatusService } from 'src/app/services/status-service/status.service';
import { Colaborator } from '../../models/colaborator';
import { ColaboratorService } from '../../services/colaborator-service/colaborator.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colaborator-add',
  templateUrl: './colaborator-add.component.html',
  styleUrls: ['./colaborator-add.component.css']
})
export class ColaboratorAddComponent implements OnInit {

  roles: Role[] = [];
  statuses: Status[] = [];
  favorited: boolean = false;

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  getStatuses(): void {
    this.statusService.getStatuses()
      .subscribe(statuses => this.statuses = statuses);
  }

  goBack(): void {
    this.location.back();
  }

  add(name: string, email: string, role: string, status: string, deliveriesMade: string, deliveriesInProgress: string): void {
    if (!name) { return; }
    const date = new Date().toLocaleString();
    const colaborator = {
      name: name,
      email: email,
      role: role,
      status: status,
      deliveriesMade: deliveriesMade || 0,
      deliveriesInProgress: deliveriesInProgress || 0,
      createdAt: date,
      updatedAt: date,
      deleted: false,
      favorited: this.favorited
    };
    this.colaboratorService.createColaborator(colaborator)
      .subscribe(() => this.router.navigate(['colaborators']));
  }

  constructor(
    private roleService: RoleService,
    private statusService: StatusService,
    private colaboratorService: ColaboratorService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getStatuses();
  }

}
