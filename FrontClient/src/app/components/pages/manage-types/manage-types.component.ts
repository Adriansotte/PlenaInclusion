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
  filteredTypes: typeDTO[] = [];
  selectedType: typeDTO | null = null;
  searchTerm: string = '';
  loading: boolean = true;

  constructor(private typeService: TypeService) { }

  ngOnInit(): void {
    this.handleTypes();
  }

  handleTypes(): void {
    this.loading = true;
    this.typeService.getAllTypes().subscribe({
      next: (response: typeDTO[]) => {
        this.types = response;
        this.filteredTypes = response;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error en recogiendo los tipos', error);
        this.loading = false;
      }
    });
  }

  onTypeClick(type: typeDTO): void {
    this.selectedType = type;
    const modalElement = document.getElementById('typeModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addTypeModal(): void {
    const modalElement = document.getElementById('addTypeModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  applyFilter(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredTypes = this.types.filter(type =>
      type.Name.toLowerCase().includes(searchTermLower)
    );
  }
}
