import _ from "lodash";
<<<<<<< HEAD
import React, { useState, useEffect, createRef } from 'react';
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormCheck, FormInput, FormSelect } from "../../base-components/Form";
=======
import React, {
  useState,
  useEffect,
  createRef,
} from "react";
import axios from "axios";
import Button from "../../base-components/Button";
import Pagination from "../../components/Pagination";
import { FormCheck, FormInput } from "../../base-components/Form";
>>>>>>> 3a153fe39e5536dac31b600227552464920802e8
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import dayjs from "dayjs";
import "jspdf-autotable";
import * as paymentService from "../../services/paymentService";


interface Wallet {
<<<<<<< HEAD
  _id: string;
=======
  id: string;
>>>>>>> 3a153fe39e5536dac31b600227552464920802e8
  name: string;
  balance: string;

}

function Main() {
<<<<<<< HEAD
  const [superlargeModalSizePreview, setSuperlargeModalSizePreview] =
    useState(false);
=======
>>>>>>> 3a153fe39e5536dac31b600227552464920802e8
  const [walletsData, setWalletsData] = useState<Wallet[]>([]);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = createRef();
  let [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
<<<<<<< HEAD
  const initialFocusRef = React.useRef<HTMLElement | null>(null);


  const [pagination, setPagination] = useState({ current_page: 1, total: 1, total_pages: 1, per_page: 1 });
  const [page, setPage] = useState(1);
  const [next_page, setNextPage] = useState(1);
  const [previous_page, setPreviousPage] = useState(1);
  useEffect(() => {
    getWallets();
  }, []);

  const getWallets = async () => {
    let res = await paymentService.getWallets({ page: 1 });
    setWalletsData(res.wallets);
    setNextPage((page < res.total_pages) ? page + 1 : res.total_pages);
    setPreviousPage((page > 1) ? page - 1 : 1);
    setPagination({ current_page: res.current_page, total: res.total, total_pages: res.total_pages, per_page: res.per_page });
  };

  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
=======

  const initialFocusRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8082/wallets").then(
      (response) => {
        setWalletsData(response.data);
        console.log(response.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleExportExcel = () => {
    axios.get("http://localhost:8082/wallets").then((response) => {
      const data = response.data;

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const fileName = "wallets.xlsx";

      const excelBuffer = XLSX.write(workbook, { type: "array" });
      const excelBlob = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(excelBlob, fileName);
    });
  };

  const exportToPDF = () => {
    // const doc = new jsPDF();
    const doc = new jsPDF() as any;
    doc.autoTable({
      head: [["Wallet ID", "Name", "Balance"]],
      body: walletsData.map((wallet) => [
        wallet.id,
        wallet.name,
        wallet.balance,
      ]),
    });
    doc.save("wallets.pdf");
  };

  const totalPages = Math.ceil(walletsData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = walletsData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  const handleViewDetails = (wallet: Wallet) => {
    setSelectedWallet(wallet);
  };
>>>>>>> 3a153fe39e5536dac31b600227552464920802e8

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Wallets</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
         
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                Excel
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                PDF
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="hidden mx-auto md:block text-slate-500">
            Showing {pagination.current_page + " to " + pagination.total_pages + " of " + pagination.total} entries
          </div>
          <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
            <div className="relative w-56 text-slate-500">
              <FormInput
                type="text"
                className="w-56 pr-10 !box"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  <FormCheck.Input type="checkbox" />
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  Wallet
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap flex items-center justify-center">
                  Balance
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {walletsData.map((wallet) => (
                <Table.Tr key={wallet._id} className="intro-y">
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <FormCheck.Input type="checkbox" value={wallet._id} />
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 !py-4 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    {wallet.userId.firstName + " " + wallet.userId.lastName}
                  </Table.Td>
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                    <span className="flex items-center justify-center">{wallet.balance}</span>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link onClick={() => (setPage(previous_page), getWallets())} >
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Pagination.Link>
            {_.times(pagination.total_pages).map((page, key) => (
              page + 1 == pagination.current_page ? <Pagination.Link onClick={() => (setPage(page + 1), getWallets())} active key={key}>{page + 1}</Pagination.Link> : <Pagination.Link onClick={() => (setPage(page + 1), getWallets())} key={key}>{page + 1}</Pagination.Link>
            ))}
            <Pagination.Link onClick={() => (setPage(next_page), getWallets())} >
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>
        </div>
        {/* END: Pagination */}
      </div>
      {/* BEGIN: View Details Dialog */}
      <Dialog
        open={!!selectedWallet}
        onClose={() => setSelectedWallet(null)}
        initialFocus={initialFocusRef}
      >
        <Dialog.Panel>
          <div className="p-5">
            <h2 className="text-lg font-medium">User Details</h2>
            {selectedWallet && (
              <div>
                <p>Name: {selectedWallet.userId.firstName + " " + selectedWallet.userId.lastName}</p>
                <p>Balance: {selectedWallet.balance}</p>
                
              </div>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: View Details Dialog */}

      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
      // initialFocus={deleteButtonRef}
      // initialFocus={initialFocusRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
            // ref={deleteButtonRef}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
      <Dialog staticBackdrop size="lg" open={superlargeModalSizePreview} onClose={() => {
        setSuperlargeModalSizePreview(false);
      }}
      >
        <Dialog.Panel className="p-10 text-center">
          This is totally awesome superlarge modal!
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Main;
