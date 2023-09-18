import { PersonListType } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { MdDeleteForever, MdEdit, MdReadMore } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { errorToast, successToast } from "@/components/ui/toast";
import { api } from "@/api/api";
import { useNavigate } from "react-router-dom";

interface PersonListProps {
  personsList: PersonListType | undefined;
  setPersonsList: React.Dispatch<
    React.SetStateAction<PersonListType | undefined>
  >;
}

export default function PersonList({
  personsList,
  setPersonsList,
}: PersonListProps) {
  const navigate = useNavigate();
  const navigateTo = (path: string) => navigate(path);

  function getFirstName(fullName: string) {
    return fullName.split(" ")[0];
  }

  async function deletePerson(id: number) {
    if (!confirm("Tem certeza que deseja excluir esta pessoa?")) return;
    try {
      await api.delete(`/pessoas/${id}`);
      personsList?.items.splice(
        personsList?.items.findIndex((person) => person.id_pessoa === id),
        1
      );
      setPersonsList({ ...personsList });
      successToast("Pessoa excluída com sucesso!");
    } catch (error) {
      errorToast("Erro ao excluir pessoa!");
    }
  }

  return (
    <Table>
      <TableHeader className="">
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Data de Admissão</TableHead>
          <TableHead>Ver Mais</TableHead>
          <TableHead>Editar</TableHead>
          <TableHead>Excluir</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {personsList?.items.map((person) => (
          <TableRow key={person.id_pessoa}>
            <TableCell>{getFirstName(person.nome)}</TableCell>
            <TableCell>{formatDate(new Date(person.data_admissao))}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                className="border-blue-300 hover:bg-blue-100"
                onClick={() => navigateTo(`/pessoas/${person.id_pessoa}`)}
              >
                <MdReadMore size={25} className="text-blue-400" />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                className="border-orange-300 hover:bg-orange-100"
                onClick={() => navigateTo(`/pessoas/${person.id_pessoa}/edit`)}
              >
                <MdEdit className="text-orange-400" />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                className="border-red-300 hover:bg-red-100"
                onClick={() => deletePerson(person.id_pessoa)}
              >
                <MdDeleteForever className="text-red-400" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
