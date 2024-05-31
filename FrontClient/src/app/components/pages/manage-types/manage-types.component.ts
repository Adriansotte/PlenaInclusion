import { Component, OnInit } from '@angular/core';
import { typeDTO } from 'src/app/models/type/typeDTO';
import { TypeService } from 'src/app/services/type/type.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-types',
  templateUrl: './manage-types.component.html',
  styleUrls: ['./manage-types.component.css']
})
export class ManageTypesComponent implements OnInit {

  types: typeDTO[] = [];
  selectedType: typeDTO | null = null;

  constructor(private typeService: TypeService) { }

  ngOnInit(): void {
    this.handleTypes();
  }

  handleTypes(): void {
    this.typeService.getAllTypes().subscribe({
      next: (response: typeDTO[]) => {
        this.types = response;
        console.log(response);
      },
      error: (error: any) => {
        console.error('Error en recogiendo los tipos', error);
      }
    })
  }

}
