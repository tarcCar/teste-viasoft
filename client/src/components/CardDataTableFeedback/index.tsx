import { Card, CardContent, CardHeader } from "@material-ui/core";
import React from "react";
import { Feedback } from "../../types/feedback";
import DataTableFeedback from "../DataTableFeedback";

type CardDataTableFeedbakProps = {
  titulo: string;
  feedBacks: Feedback[];
  feedbacksDoUsuario?: boolean;
};

const CardDataTableFeedbak: React.FC<CardDataTableFeedbakProps> = ({
  titulo,
  feedBacks,
  feedbacksDoUsuario,
}) => (
  <Card style={{ marginTop: 20 }}>
    <CardHeader title={titulo} />
    <CardContent>
      <DataTableFeedback
        feedBacks={feedBacks}
        feedbacksDoUsuario={feedbacksDoUsuario}
      />
    </CardContent>
  </Card>
);

export default CardDataTableFeedbak;
