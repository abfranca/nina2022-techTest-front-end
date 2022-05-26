import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { Status } from 'src/app/models/status';
import { RoleService } from 'src/app/services/role-service/role.service';
import { StatusService } from 'src/app/services/status-service/status.service';
import { Colaborator } from '../../models/colaborator';
import { ColaboratorService } from '../../services/colaborator-service/colaborator.service';

@Component({
  selector: 'app-colaborators',
  templateUrl: './colaborators.component.html',
  styleUrls: ['./colaborators.component.css']
})
export class ColaboratorsComponent implements OnInit {

  colaborators: Colaborator[] = [];
  roles: Role[] = [];
  statuses: Status[] = [];
  filtering: boolean = false;
  byId: boolean = false;
  minId: number = 0;
  maxId: number = 0;
  byName: boolean = false;
  nameToFind: string = '';
  byEmail: boolean = false;
  emailToFind: string = '';
  byRole: boolean = false;
  roleToFind: string = 'Deliverer';
  byStatus: boolean = false;
  statusToFind: string = 'Active';
  byCreate: boolean = false;
  createDate: string = '2022-01-01';
  byUpdate: boolean = false;
  updateDate: string = '2022-01-01';
  byDeliveries: boolean = false;
  minDeliveries: number = 0;
  maxDeliveries: number = 0;
  sorting: boolean = false;
  sortCriteria: number = 1;
  itemsPerPage: number = 10;
  pageToShow: number = 1;
  totalPages: number = 1;

  getColaborators(): void {
    this.colaboratorService.getColaborators()
      .subscribe(colaborators => {
        var totalColaborators = colaborators.filter(this.filterByOptions).sort(this.sortByOption);
        this.totalPages = Math.ceil(totalColaborators.length / this.itemsPerPage);
        if (this.totalPages < this.pageToShow) {
          this.pageToShow = this.totalPages;
        }
        if (this.pageToShow == 0 && this.totalPages > 0) {
          this.pageToShow = 1;
        }
        this.colaborators = totalColaborators.slice((this.pageToShow - 1) * this.itemsPerPage, this.itemsPerPage * this.pageToShow);
      });
  }

  filterByOptions = (colaborator: Colaborator) => {
    var response = !colaborator.deleted;
    if (this.filtering) {
      if (this.byId && response) {
        if (this.maxId < this.minId) {
          this.maxId = this.minId;
        }
        response = colaborator.id >= (this.minId || 1) && colaborator.id <= (this.maxId || colaborator.id);
      }
      if (this.byName && response) {
        response = colaborator.name.toLowerCase().includes((this.nameToFind.toLowerCase() || colaborator.name.toLowerCase()));
      }
      if (this.byEmail && response) {
        response = colaborator.email.toLowerCase().includes((this.emailToFind.toLowerCase() || colaborator.email.toLowerCase()));
      }
      if (this.byRole && response) {
        response = colaborator.role == (this.roleToFind || colaborator.role);
      }
      if (this.byStatus && response) {
        response = colaborator.status == (this.statusToFind || colaborator.status);
      }
      if (this.byCreate && response) {
        response = colaborator.createdAt.includes((new Date(`${this.createDate}T00:00:00-03:00`).toLocaleString().slice(0, 10) || colaborator.createdAt));
      }
      if (this.byUpdate && response) {
        response = colaborator.updatedAt.includes((new Date(`${this.updateDate}T00:00:00-03:00`).toLocaleString().slice(0, 10) || colaborator.createdAt));
      }
      if (this.byDeliveries && response) {
        if (this.maxDeliveries < this.minDeliveries) {
          this.maxDeliveries = this.minDeliveries;
        }
        response = colaborator.deliveriesMade >= (this.minDeliveries || 0) && colaborator.deliveriesMade <= (this.maxDeliveries || colaborator.deliveriesMade);
      }
    }
    return response;
  }

  sortByOption = (colaboratorA: Colaborator, colaboratorB: Colaborator) => {
    var response = 0;
    if (!this.sorting || this.sortCriteria == 1) {
      if (colaboratorA.id < colaboratorB.id) {
        response = -1;
      } else if (colaboratorA.id > colaboratorB.id) {
        response = 1;
      } else {
        response = 0;
      }
    } else if (this.sortCriteria == 2) {
      if (colaboratorA.name.toLowerCase() < colaboratorB.name.toLowerCase()) {
        response = -1;
      } else if (colaboratorA.name.toLowerCase() > colaboratorB.name.toLowerCase()) {
        response = 1;
      } else {
        response = 0;
      }
    } else if (this.sortCriteria == 3) {
      if (colaboratorA.email.toLowerCase() < colaboratorB.email.toLowerCase()) {
        response = -1;
      } else if (colaboratorA.email.toLowerCase() > colaboratorB.email.toLowerCase()) {
        response = 1;
      } else {
        response = 0;
      }
    } else if (this.sortCriteria == 4) {
      if (this.roles.filter(role => role.name == colaboratorA.role)[0].id < this.roles.filter(role => role.name == colaboratorB.role)[0].id) {
        response = -1;
      } else if (this.roles.filter(role => role.name == colaboratorA.role)[0].id > this.roles.filter(role => role.name == colaboratorB.role)[0].id) {
        response = 1;
      } else {
        response = 0;
      }
    } else if (this.sortCriteria == 5) {
      if (this.statuses.filter(status => status.name == colaboratorA.status)[0].id < this.statuses.filter(status => status.name == colaboratorB.status)[0].id) {
        response = -1;
      } else if (this.statuses.filter(status => status.name == colaboratorA.status)[0].id > this.statuses.filter(status => status.name == colaboratorB.status)[0].id) {
        response = 1;
      } else {
        response = 0;
      }
    } else if (this.sortCriteria == 6) {
      var dateA = new Date(`${colaboratorA.createdAt.slice(6, 10)}-${colaboratorA.createdAt.slice(3, 5)}-${colaboratorA.createdAt.slice(0, 2)}T${colaboratorA.createdAt.slice(11, 13)}:${colaboratorA.createdAt.slice(14, 16)}:${colaboratorA.createdAt.slice(17)}`);
      var dateB = new Date(`${colaboratorB.createdAt.slice(6, 10)}-${colaboratorB.createdAt.slice(3, 5)}-${colaboratorB.createdAt.slice(0, 2)}T${colaboratorB.createdAt.slice(11, 13)}:${colaboratorB.createdAt.slice(14, 16)}:${colaboratorB.createdAt.slice(17)}`)
      if (dateA.getTime() < dateB.getTime()) {
        response = -1;
      } else if (dateA.getTime() > dateB.getTime()) {
        response = 1;
      } else {
        response = 0;
      }
    } else if (this.sortCriteria == 7) {
      var dateA = new Date(`${colaboratorA.updatedAt.slice(6, 10)}-${colaboratorA.updatedAt.slice(3, 5)}-${colaboratorA.updatedAt.slice(0, 2)}T${colaboratorA.updatedAt.slice(11, 13)}:${colaboratorA.updatedAt.slice(14, 16)}:${colaboratorA.updatedAt.slice(17)}`);
      var dateB = new Date(`${colaboratorB.updatedAt.slice(6, 10)}-${colaboratorB.updatedAt.slice(3, 5)}-${colaboratorB.updatedAt.slice(0, 2)}T${colaboratorB.updatedAt.slice(11, 13)}:${colaboratorB.updatedAt.slice(14, 16)}:${colaboratorB.updatedAt.slice(17)}`)
      if (dateA.getTime() > dateB.getTime()) {
        response = -1;
      } else if (dateA.getTime() < dateB.getTime()) {
        response = 1;
      } else {
        response = 0;
      }
    } else if (this.sortCriteria == 8) {
      if (colaboratorA.deliveriesMade > colaboratorB.deliveriesMade) {
        response = -1;
      } else if (colaboratorA.deliveriesMade < colaboratorB.deliveriesMade) {
        response = 1;
      } else {
        response = 0;
      }
    }
    return response;
  }

  goBack(): void {
    this.router.navigate(['start']);
  }

  goAdd(): void {
    this.router.navigate(['add']);
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  getStatuses(): void {
    this.statusService.getStatuses()
      .subscribe(statuses => this.statuses = statuses);
  }

  decreasePage(): void {
    if (this.pageToShow > 1) {
      this.pageToShow--;
      this.getColaborators();
    }
  }

  increasePage(): void {
    if (this.pageToShow < this.totalPages) {
      this.pageToShow++;
      this.getColaborators();
    }
  }

  resetPage(): void {
    this.pageToShow = 1;
  }

  save(colaborator: Colaborator): void {
    if (colaborator) {
      colaborator.updatedAt = new Date().toLocaleString();
      this.colaboratorService.updateColaborator(colaborator)
        .subscribe(() => { });
    }
  }

  constructor(
    private roleService: RoleService,
    private statusService: StatusService,
    private colaboratorService: ColaboratorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getColaborators();
    this.getRoles();
    this.getStatuses();
  }

}
