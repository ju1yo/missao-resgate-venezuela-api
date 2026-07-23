function getPagination(query) {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  if (!Number.isInteger(page) || page < 1) page = 1;
  if (!Number.isInteger(limit) || limit < 1) limit = 10;
  if (limit > 100) limit = 100; // limite de segurança

  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

function buildPaginatedResponse({ page, limit, total, data }) {
  return {
    pagina_atual: page,
    itens_por_pagina: limit,
    total_registros: total,
    total_paginas: Math.max(Math.ceil(total / limit), 1),
    dados: data,
  };
}

module.exports = { getPagination, buildPaginatedResponse };
