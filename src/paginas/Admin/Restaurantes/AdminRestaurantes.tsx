import { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import {
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminRestaurantes;
