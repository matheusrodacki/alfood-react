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

function AdminRestaurantes() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios
      .get<IRestaurante[]>(
        'https://sturdy-umbrella-4vvwj6rgrxhq4pp-8000.app.github.dev/api/v2/restaurantes/'
      )
      .then((response) => setRestaurantes(response.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => {
            return (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminRestaurantes;
