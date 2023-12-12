import { CSVWriter } from "./6-csv-writer-refactor1";

interface Payment {
  id: number
  amount: number
  to: string
  notes: string
}

const paymentWriter = new CSVWriter<Payment>(["id", "amount", "to", "notes"])

paymentWriter.addRows([
  { id: 1, amount: 50, to: "yoshi", notes: "for design work" },
  { id: 2, amount: 100, to: "mario", notes: "for dev work" }
])

paymentWriter.save("./data/payments.csv")
