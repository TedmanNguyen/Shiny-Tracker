import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameGenerationService } from '../game-generation.service';

@Component({
  selector: 'app-hunt-instance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hunt-instance.component.html',
  styleUrls: ['./hunt-instance.component.css'],
})
export class HuntInstanceComponent {
  gameGenerations: string[] = [];

  constructor(private gameGenerationService: GameGenerationService) {}

  ngOnInit(): void {
    this.gameGenerationService.getGameGenerations().subscribe((data) => {
      this.gameGenerations = Object.keys(data);
    });
  }
}
