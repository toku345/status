import { Component, OnInit } from "@angular/core";

export interface Toku345Status {
  name: string;
  status: string;
}

@Component({
  selector: "app-toku345-status",
  templateUrl: "./toku345-status.component.html",
  styleUrls: ["./toku345-status.component.css"]
})
export class Toku345StatusComponent implements OnInit {
  displayedColumns: string[] = ["name", "status"];
  toku345Statuses: Toku345Status[] = [
    { name: "体力", status: "operational" },
    { name: "集中力", status: "warning" },
    { name: "コミュニケーション力", status: "warning" }
  ];

  constructor() {}

  ngOnInit() {}
}
