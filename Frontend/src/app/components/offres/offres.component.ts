import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre } from 'src/app/models/Offre';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { OffreService } from 'src/app/services/offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.scss']
})
export class OffresComponent implements OnInit {

  offres$!: Observable<Offre[]>;
  userId: Pick<User, "id"> | undefined;

  constructor(
    private offreService:OffreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.offres$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Offre[]> {
    return this.offreService.fetchAll();
  }

  createOffre(): void {
    this.offres$ = this.fetchAll();
  }

  delete(offreId: Pick<Offre, "id">): void {
    this.offreService
      .deleteOffre(offreId)
      .subscribe(() => (this.offres$ = this.fetchAll()));
  } 
}
