import { appendFileSync } from "fs"

interface Payment {
  id: number
  amount: number
  to: string
  notes: string
}

type PaymentColumns = ("id" | "amount" | "to" | "notes")[]

class CSVWriter {
  private csv: string

  constructor(private columns: PaymentColumns) {
    this.csv = this.columns.join(",") + "\n"
  }

  save(fileName: string): void {
    appendFileSync(fileName, this.csv)
    this.csv = "\n"

    console.log("file saved to", fileName)
  }

  addRows(values: Payment[]): void {
    let rows = values.map((v) => this.formatRow(v))

    this.csv += rows.join("\n")

    console.log(this.csv)
  }

  private formatRow(payment: Payment): string {
    return this.columns.map((column) => payment[column]).join(",")
  }
}

const writer = new CSVWriter(["id", "amount", "to", "notes"])

writer.addRows([
  { id: 1, amount: 50, to: "yoshi", notes: "for design work" },
  { id: 2, amount: 100, to: "mario", notes: "for dev work" }
])

writer.save("./data/payments.csv")
