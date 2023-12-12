import { appendFileSync } from "fs"

export class CSVWriter<T> {
  private csv: string

  constructor(private columns: (keyof T)[]) {
    this.csv = this.columns.join(",") + "\n"
  }

  save(fileName: string): void {
    appendFileSync(fileName, this.csv)
    this.csv = "\n"

    console.log("file saved to", fileName)
  }

  addRows(values: T[]): void {
    let rows = values.map((v) => this.formatRow(v))

    this.csv += rows.join("\n")

    console.log(this.csv)
  }

  private formatRow(value: T): string {
    return this.columns.map((column) => value[column]).join(",")
  }
}


