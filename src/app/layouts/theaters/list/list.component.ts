import { Component, OnInit } from '@angular/core';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  theaters: Theater[] = []
  constructor(private theaterService: TheaterService) { }

  ngOnInit(): void {
    this.theaterService.list().subscribe({
      next: (theaters) => {
        this.theaters = theaters;
        console.log('Theaters fetched succesfuly', this.theaters)
      },
      error: (error) => {
        console.error('Error fetching theaters:', error);
      }
    });

    

  }
  edit(id:number){
    console.log("Edit theater with id: ", id);

  }
}
