"use client";

import { useEffect, useState } from "react";

import { TransactionCard } from "@/app/dashboard/(components)/comp.card-transaction";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/transaction";

import { getTransaction } from "../../(action)/action.get-transaction";

export default function Page() {
  const [data, setData] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);

  const loadMore = async () => {
    const response = await getTransaction(page);
    if (response?.data.records) {
      setData((current) => [...current, ...response.data.records]);
      setPage((current) => current + 1);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      const response = await getTransaction(0);
      if (response?.data.records) {
        setData(response.data.records);
        setPage(1);
      }
    };
    void initialLoad();
  }, []);

  return (
    <section className="max-w-7xl mx-auto pb-5">
      <div className="space-y-6">
        <h4 className="text-xl font-semibold tracking-normal">Semua Transaksi</h4>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <TransactionCard {...item} />
            </div>
          ))}

          <div className="text-center py-5">
            <Button onClick={loadMore}>Load More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
