import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { baseURL } from '../../../shared/host';

function FormularioRestaurante() {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    axios
      .post(baseURL + '/api/v2/restaurantes/', {
        nome: nomeRestaurante,
      })
      .then(() => {
        alert('Restaurante cadastrado com sucesso!');
      });
  }
  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        value={nomeRestaurante}
        onChange={(event) => setNomeRestaurante(event.target.value)}
        id='standard-basic'
        label='Nome do Restaurante'
        variant='standard'></TextField>
      <Button type='submit' variant='outlined'>
        Outlined
      </Button>
    </form>
  );
}

export default FormularioRestaurante;
