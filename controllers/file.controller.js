const fs = require('fs');
const uploadFile = require('../middlewares/upload');

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file === undefined) {
      return res.status(400).send({ message: 'Por favor, faça o upload de um arquivo.' });
    }

    res.status(200).send({
      message: 'Arquivo enviado com sucesso: ' + req.file.originalname,
    });
  } catch (err) {
    if (err.code == 'LIMIT_FILE_SIZE') {
      return res.status(500).send({
        message: 'O arquivo não pode ser maior que ' + process.env.APP_FILE_MAX_SIZE + 'MB!',
      });
    }

    res.status(500).send({
      message: 'Não foi possível subir o arquvo: ' + req.file.originalname + ', ' + err,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + '/resources/static/assets/uploads/';

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Não foi possível listar os arquivos: ' + err,
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: directoryPath + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + '/resources/static/assets/uploads/';
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Não foi possível baixar o arquivo. ' + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
