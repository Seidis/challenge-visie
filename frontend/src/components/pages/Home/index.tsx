import { useEffect, useState } from "react";
import { api } from "@/api/api";
import PersonList from "./PersonList";
import { PersonListType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Home() {
  const [persons, setPersons] = useState<PersonListType>();

  function getPersons(page: number = 1, size: number = 10) {
    api.get(`/pessoas?page=${page}&size=${size}`).then((response) => {
      setPersons(response.data);
    });
  }

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <main className="w-8/12">
        <div className="space-x-2 flex justify-end pt-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="border-green-300  text-green-300 hover:text-green-300 hover:bg-green-100"
          >
            <IoPersonAddSharp size={20} className="mr-2 text-green-300" />
            Adicionar pessoa
          </Button>
        </div>
        <PersonList personsList={persons} />
        <div
          className={`flex justify-between ${
            persons ? "block" : "hidden"
          } items-center`}
        >
          <div className="space-x-2 flex justify-center pt-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={() => getPersons(persons ? persons.page - 1 : 1)}
              disabled={
                persons ? persons.page === 1 || persons.page === 0 : true
              }
            >
              <IoIosArrowBack size={20} className="mr-2" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => getPersons(persons ? persons.page + 1 : 1)}
              disabled={persons ? persons.page === persons.pages : true}
            >
              Próxima
              <IoIosArrowForward size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
