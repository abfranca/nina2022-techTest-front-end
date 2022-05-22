import { Component, OnInit } from '@angular/core';
import { Colaborator } from '../../models/colaborator';
import { ColaboratorService } from '../../services/colaborator-service/colaborator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  colaborators: Colaborator[] = [];

  constructor(private colaboratorService: ColaboratorService) { }

  ngOnInit(): void {
    this.getColaborators();
  }

  getColaborators(): void {
    this.colaboratorService.getColaborators()
      .subscribe(colaborators => this.colaborators = colaborators.slice(1, 5));
  }
}