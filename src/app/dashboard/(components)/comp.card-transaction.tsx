import { formatDate, formatTime } from "@/lib/dates-format";
import { Transaction } from "@/types/transaction";

export const TransactionCard: React.FC<Transaction> = ({ transaction_type, description, total_amount, created_on }) => {
  return (
    <section className="flex items-center justify-between">
      <div className="space-y-1">
        <p className={`${transaction_type === "TOPUP" ? "text-green-500" : "text-red-500"} font-medium text-lg`}>
          {transaction_type === "TOPUP" ? "+ " : "- "}
          Rp{total_amount.toLocaleString("id")}
        </p>
        <p className="text-gray-400 text-sm">
          {formatDate(created_on)} {formatTime(created_on)} WIB
        </p>
      </div>
      <div>
        <p className="text-gray-500">{description}</p>
      </div>
    </section>
  );
};
