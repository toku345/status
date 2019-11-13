import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-status-area",
  templateUrl: "./status-area.component.html",
  styleUrls: ["./status-area.component.css"]
})
export class StatusAreaComponent implements OnInit {
  //  0.25 -   1.0: Good
  // -0.25 -  0.25: Usually
  //  -1.0 - -0.25: Bad
  score: number = 0.25;

  constructor() {}

  ngOnInit() {}
}
