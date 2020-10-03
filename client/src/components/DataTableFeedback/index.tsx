/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

import {
  Description,
  Edit,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";
import { format, parseISO } from "date-fns";
import { useHistory } from "react-router";
import { Feedback } from "../../types/feedback";
import DialogDetalhesFeedback from "../DialogDetalhesFeedback";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;

  onChangePage: (event: any, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const {
    count: quantidade,
    page: pagina,
    rowsPerPage: linhasPorPagina,
    onChangePage,
  } = props;

  const primeiraPaginaButtonClickHandler = (event: any) => {
    onChangePage(event, 0);
  };

  const paginaAnteriorButtonClickHandler = (event: any) => {
    onChangePage(event, pagina - 1);
  };

  const proximaPaginaButtonClickHandler = (event: any) => {
    onChangePage(event, pagina + 1);
  };

  const ultimaPaginaButtonClickHandler = (event: any) => {
    onChangePage(
      event,
      Math.max(0, Math.ceil(quantidade / linhasPorPagina) - 1)
    );
  };

  return (
    <>
      <IconButton
        onClick={primeiraPaginaButtonClickHandler}
        disabled={pagina === 0}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={paginaAnteriorButtonClickHandler}
        disabled={pagina === 0}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={proximaPaginaButtonClickHandler}
        disabled={pagina >= Math.ceil(quantidade / linhasPorPagina) - 1}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={ultimaPaginaButtonClickHandler}
        disabled={pagina >= Math.ceil(quantidade / linhasPorPagina) - 1}
      >
        <LastPage />
      </IconButton>
    </>
  );
}

type DataTableFeedbackProps = {
  feedBacks: Feedback[];
  feedbacksDoUsuario?: boolean;
};

const DataTableFeedback: React.FC<DataTableFeedbackProps> = ({
  feedBacks,
  feedbacksDoUsuario,
}) => {
  const [pagina, setPagina] = useState(0);
  const [linhasPorPagina, setLinhasPorPagina] = useState(5);
  const [abirDialog, setAbirDialog] = useState(false);
  const [feedbackDetalhes, setFeedbackDetalhes] = useState<Feedback | null>(
    null
  );
  const history = useHistory();

  const handleChangePage = (event: any, novaPagina: number) => {
    setPagina(novaPagina);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setLinhasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  useEffect(() => {
    setAbirDialog(!!feedbackDetalhes);
  }, [feedbackDetalhes]);

  const onEditarClickHandler = (feedback: Feedback) => {
    if (feedback) {
      history.push({
        pathname: "/feedback/cadastro",
        state: {
          feedBackParaAtualizar: feedback,
        },
      });
    }
  };

  const onDetalheClickHandler = (feedback: Feedback) => {
    if (feedback) setFeedbackDetalhes(feedback);
  };

  const handleCloseDialogDetalhes = () => {
    setFeedbackDetalhes(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {feedbacksDoUsuario ? "Para Quem" : "De Quem"}
              </TableCell>
              <TableCell>Sugestões</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Criado Em</TableCell>
              <TableCell>Útima Alteração</TableCell>
              <TableCell>Detalhes</TableCell>
              {feedbacksDoUsuario && <TableCell>Editar</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {feedBacks.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhum feedback encontrado
                </TableCell>
              </TableRow>
            ) : (
              (linhasPorPagina > 0
                ? feedBacks.slice(
                    pagina * linhasPorPagina,
                    pagina * linhasPorPagina + linhasPorPagina
                  )
                : feedBacks
              ).map((feedBack) => (
                <TableRow key={feedBack.id}>
                  <TableCell component="th" scope="row">
                    {feedbacksDoUsuario
                      ? feedBack.usuarioDestino?.nome
                      : feedBack.usuarioOrigem?.nome}
                  </TableCell>
                  <TableCell>{feedBack.sugestoes}</TableCell>
                  <TableCell>{feedBack.feedBackFinal}</TableCell>
                  <TableCell>
                    {feedBack.criadoEm
                      ? format(
                          parseISO(feedBack.criadoEm),
                          "dd/MM/yyyy HH:mm:ss"
                        )
                      : ""}
                  </TableCell>
                  <TableCell>
                    {feedBack.alteradoEm
                      ? format(
                          parseISO(feedBack.alteradoEm),
                          "dd/MM/yyyy HH:mm:ss"
                        )
                      : ""}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        onDetalheClickHandler(feedBack);
                      }}
                    >
                      <Description />
                    </IconButton>
                  </TableCell>
                  {feedbacksDoUsuario && (
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          onEditarClickHandler(feedBack);
                        }}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            {feedBacks.length > 0 && (
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "Todos", value: -1 },
                  ]}
                  colSpan={3}
                  count={feedBacks.length}
                  rowsPerPage={linhasPorPagina}
                  page={pagina}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
      {feedbackDetalhes && abirDialog && (
        <DialogDetalhesFeedback
          feedback={feedbackDetalhes}
          open={abirDialog}
          handleClose={handleCloseDialogDetalhes}
        />
      )}
    </>
  );
};
export default DataTableFeedback;
