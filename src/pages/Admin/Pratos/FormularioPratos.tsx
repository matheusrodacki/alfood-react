import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IPrato from '../../../interfaces/IPrato';
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IRestaurante from '../../../interfaces/IRestaurante';

function FormularioPrato() {
  const parametros = useParams();

  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>('v2/tags/')
      .then((response) => setTags(response.data.tags));
    http
      .get<IRestaurante[]>('v2/restaurantes/')
      .then((response) => setRestaurantes(response.data));
  }, []);

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`v2/pratos/${parametros.id}/`).then((response) => {
        setNomePrato(response.data.nome);
        setDescricao(response.data.descricao);
        setTag(response.data.tag);
        http
          .get<IRestaurante>(`v2/restaurantes/${response.data.restaurante}/`)
          .then((response) => setRestaurante(response.data.nome));
      });
    }
  }, [restaurantes, parametros]);

  function selecionarArquivo(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length) {
      setImagem(event.target.files[0]);
    } else {
      setImagem(null);
    }
  }

  function aoSubmeterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    if (parametros.id) {
      http
        .request({
          url: `v2/pratos/${parametros.id}/`,
          method: 'PUT',
          headers: {
            'Content-Type': 'multpart/form-data',
          },
          data: formData,
        })
        .then(() => {
          alert('Prato atualizado com sucesso!');
        })
        .catch((erro) => console.log(erro));
    } else {
      http
        .request({
          url: 'v2/pratos/',
          method: 'POST',
          headers: {
            'Content-Type': 'multpart/form-data',
          },
          data: formData,
        })
        .then(() => {
          alert('Prato cadastrado com sucesso!');
          setNomePrato('');
          setDescricao('');
          setTag('');
          setRestaurante('');
        })
        .catch((erro) => console.log(erro));
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
        Formulário de Pratos
      </Typography>
      <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
        <TextField
          value={nomePrato}
          onChange={(event) => setNomePrato(event.target.value)}
          id='standard-basic'
          label='Nome do Prato'
          variant='standard'
          margin='dense'
          fullWidth
          required
        />
        <TextField
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          id='standard-basic'
          label='Descrição do Prato'
          variant='standard'
          margin='dense'
          fullWidth
          required
        />

        <FormControl margin='dense' fullWidth>
          <InputLabel id='select-tag'>Tag</InputLabel>
          <Select
            labelId='select-tag'
            value={tag}
            onChange={(event) => setTag(event.target.value)}>
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin='dense' fullWidth>
          <InputLabel id='select-resturante'>Restaurante</InputLabel>
          <Select
            labelId='select-restaurante'
            value={restaurante}
            onChange={(event) => setRestaurante(event.target.value)}>
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type='file' onChange={selecionarArquivo} />

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

export default FormularioPrato;
