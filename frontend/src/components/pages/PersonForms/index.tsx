import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/api/api";
import { errorToast, successToast, warningToast } from "@/components/ui/toast";

export default function PersonForms({ edit = false }: { edit?: boolean }) {
  const navigate = useNavigate();
  const navigateTo = (path: string) => navigate(path);

  const { id_pessoa } = useParams();

  const [isEditing, setIsEditing] = useState<boolean>(edit);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rg: "",
    data_nascimento: "",
    data_admissao: "",
    funcao: "",
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function getPerson(id: string) {
    try {
      const response = await api.get(`/pessoas/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.log(error);
      errorToast("Erro ao buscar pessoa!");
    }
  }

  async function addPerson() {
    try {
      await api.post("/pessoas", formData);
      successToast("Pessoa adicionada com sucesso!");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      errorToast("Erro ao adicionar pessoa!");
    }
  }

  async function updatePerson() {
    try {
      await api.patch(`/pessoas/${id_pessoa}`, formData);
      successToast("Pessoa atualizada com sucesso!");
      navigateTo(`/pessoas/${id_pessoa}`);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      errorToast("Erro ao atualizar pessoa!");
    }
  }

  async function deletePerson() {
    if (!confirm("Tem certeza que deseja excluir esta pessoa?")) return;
    try {
      await api.delete(`/pessoas/${id_pessoa}`);
      successToast("Pessoa excluída com sucesso!");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      errorToast("Erro ao excluir pessoa!");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isEditing) {
      updatePerson();
    } else {
      addPerson();
    }
  }

  useEffect(() => {
    if (id_pessoa) {
      getPerson(id_pessoa);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <main className="w-8/12">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleInputChange}
              disabled={!isEditing && id_pessoa ? true : false}
              required
            />
            <Label htmlFor="cpf">CPF</Label>
            <Input
              name="cpf"
              type="text"
              value={formData.cpf}
              onChange={handleInputChange}
              disabled={!isEditing && id_pessoa ? true : false}
              required
            />
            <Label htmlFor="rg">RG</Label>
            <Input
              name="rg"
              type="text"
              value={formData.rg}
              onChange={handleInputChange}
              disabled={!isEditing && id_pessoa ? true : false}
              required
            />
            <Label htmlFor="data_nascimento">Data de nascimento</Label>
            <Input
              name="data_nascimento"
              type="date"
              value={formData.data_nascimento}
              onChange={handleInputChange}
              disabled={!isEditing && id_pessoa ? true : false}
              required
            />
            <Label htmlFor="data_admissao">Data de admissão</Label>
            <Input
              name="data_admissao"
              type="date"
              value={formData.data_admissao}
              onChange={handleInputChange}
              disabled={!isEditing && id_pessoa ? true : false}
              required
            />
            <Label htmlFor="funcao">Função</Label>
            <Input
              name="funcao"
              type="text"
              value={formData.funcao}
              onChange={handleInputChange}
              disabled={!isEditing && id_pessoa ? true : false}
            />
          </div>
          <div className="flex flex-row pt-4">
            <div className="flex justify-start w-8/12 ">
              <Button
                variant="outline"
                size="sm"
                className={
                  "border-blue-300  text-blue-300 hover:text-blue-300 hover:bg-blue-100"
                }
                onClick={() => navigateTo(`/`)}
                type="button"
              >
                Voltar
              </Button>
            </div>
            <div className="flex justify-end w-8/12 gap-4">
              <Button
                variant="outline"
                size="sm"
                className={
                  "border-orange-300  text-orange-300 hover:text-orange-300 hover:bg-orange-100" +
                  (isEditing || !id_pessoa ? " hidden" : "")
                }
                onClick={() => setIsEditing(!isEditing)}
                type="button"
              >
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={
                  "border-red-300  text-red-300 hover:text-red-300 hover:bg-red-100" +
                  (isEditing || !id_pessoa ? " hidden" : "")
                }
                onClick={() => deletePerson()}
                type="button"
              >
                Excluir
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={
                  "border-green-300  text-green-300 hover:text-green-300 hover:bg-green-100" +
                  (id_pessoa ? " hidden" : "")
                }
                type="submit"
              >
                Adicionar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={
                  "border-green-300  text-green-300 hover:text-green-300 hover:bg-green-100" +
                  (!isEditing || !id_pessoa ? " hidden" : "")
                }
                type="submit"
              >
                Salvar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={
                  "border-red-300  text-red-300 hover:text-red-300 hover:bg-red-100" +
                  (!isEditing || !id_pessoa ? " hidden" : "")
                }
                onClick={() => {
                  warningToast("Nenhuma alteração foi salva!");
                  navigateTo(`/`);
                }}
                type="button"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
