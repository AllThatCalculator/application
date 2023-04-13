exports.adminContent = (title, categoryMain, categorySub, description, manual, button) => `
<!-- 계산기 제목 및 카테고리 -->
<tr>
  <table width="100%">
    <tr>
      <td align="left" style="padding-top: 0; padding-right: 0; padding-bottom: 30px; padding-left: 0">
        <b style="font-size: 18px;">
          ${title}
        </b>
      </td>
      <td align="right" style="padding-top: 0; padding-right: 0; padding-bottom: 30px; padding-left: 0;">
        ${categoryMain} / ${categorySub}
      </td>
    </tr>
  </table>
</tr>
<!-- 계산기 한 줄 설명 -->
<tr>
  <td align="left" style="padding-top: 0; padding-right: 0; padding-bottom: 30px; padding-left: 0;">
    ${description}
  </td>
</tr>
<!-- 계산기 설명서 -->
<tr>
  <td align="left" style="padding-top: 0; padding-right: 0; padding-bottom: 30px; padding-left: 0;">
    ${manual}
  </td>
</tr>
<!-- 바로가기 링크 -->
${button}
`;