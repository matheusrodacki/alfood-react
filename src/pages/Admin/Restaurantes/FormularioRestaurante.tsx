import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

function FormularioRestaurante() {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`v2/restaurantes/${parametros.id}/`)
        .then((response) => setNomeRestaurante(response.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (parametros.id) {
      http
        .put(`v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante atualizado com sucesso!');
        });
    } else {
      http
        .post('v2/restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!');
        });
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
      }}>
      <Typography component='h1' variant='h6'>
        Formulário de Restaurantes
      </Typography>
      <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          onChange={(event) => setNomeRestaurante(event.target.value)}
          id='standard-basic'
          label='Nome do Restaurante'
          variant='standard'
          fullWidth
          required></TextField>
        <Button
          sx={{ marginTop: 1 }}
          type='submit'
          variant='outlined'
          fullWidth>
          Salvar
        </Button>
      </Box>
    </Box>
  );
}

export default FormularioRestaurante;
