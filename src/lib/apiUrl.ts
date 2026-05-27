const isProd = import.meta.env.PROD;

export const apiUrl = {
  upload:   isProd ? '/api/admin/upload.php'   : '/api/admin/upload',
  check:    isProd ? '/api/admin/check.php'    : '/api/admin/check',
  delete:   isProd ? '/api/admin/delete.php'   : '/api/admin/delete',
  diagramas: isProd ? '/api/admin/diagramas.php' : '/api/admin/diagramas',
};
