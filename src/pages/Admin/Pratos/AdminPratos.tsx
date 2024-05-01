import { useEffect, useState } from 'react';
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
import http from '../../../http';
import { Link } from 'react-router-dom';
import IPrato from '../../../interfaces/IPrato';

function AdminPratos() {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http
      .get<IPrato[]>('v2/pratos/')
      .then((response) => setPratos(response.data));
  }, []);

  function excluir(pratoExcluido: IPrato) {
    http.delete(`v2/pratos/${pratoExcluido.id}/`).then(() => {
      const listaPratos = pratos.filter(
        (prato) => prato.id !== pratoExcluido.id
      );
      setPratos([...listaPratos]);
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => {
            return (
              <TableRow key={prato.id}>
                <TableCell>{prato.nome}</TableCell>
                <TableCell>{prato.tag}</TableCell>
                <TableCell>[<a href={prato.imagem} target='_blank' rel="noreferrer">Ver Imagem</a>]</TableCell>
                <TableCell>
                  [
                  <Link to={`/admin/pratos/${prato.id}`}>
                    editar
                  </Link>
                  ]
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => excluir(prato)}>
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

export default AdminPratos;
