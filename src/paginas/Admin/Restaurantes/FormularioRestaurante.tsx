import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../shared/host';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

function FormularioRestaurante() {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios
        .get<IRestaurante>(baseURL + `api/v2/restaurantes/${parametros.id}/`)
        .then((response) => setNomeRestaurante(response.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (parametros.id) {
      axios
        .put(baseURL + `/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante atualizado com sucesso!');
        });
    } else {
      axios
        .post(baseURL + '/api/v2/restaurantes/', {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!');
        });
    }
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
