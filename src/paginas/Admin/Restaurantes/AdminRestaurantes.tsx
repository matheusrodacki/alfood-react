import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import { baseURL } from '../../../shared/host';
import { Link } from 'react-router-dom';
function AdminRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios
      .get<IRestaurante[]>(baseURL + '/api/v2/restaurantes/')
      .then((response) => setRestaurantes(response.data));
  }, []);

  function excluir(restauranteExcluido: IRestaurante) {
    axios
      .delete(baseURL + `api/v2/restaurantes/${restauranteExcluido.id}/`)
      .then(() => {
        const listaRestaurantes = restaurantes.filter(
          (restaurante) => restaurante.id !== restauranteExcluido.id
        );
        setRestaurantes([...listaRestaurantes]);
      });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => {
            return (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
                <TableCell>
                  [
                  <Link to={`/admin/restaurantes/${restaurante.id}`}>
                    editar
                  </Link>
                  ]
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => excluir(restaurante)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminRestaurantes;
