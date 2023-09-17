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

interface PersonListProps {
  personsList: PersonListType | undefined;
}

export default function PersonList({ personsList }: PersonListProps) {
  function getFirstName(fullName: string) {
    return fullName.split(" ")[0];
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
              >
                <MdReadMore size={25} className="text-blue-400" />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                className="border-orange-300 hover:bg-orange-100"
              >
                <MdEdit className="text-orange-400" />
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                className="border-red-300 hover:bg-red-100"
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
